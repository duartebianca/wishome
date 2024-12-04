from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import secrets
from email_service.email_service import EmailService
from datetime import timedelta
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://wishome.vercel.app"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = secrets.token_hex(32)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=180)


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Modified User model without password
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='gifter')
    status = db.Column(db.String(50), nullable=False, default='pending')
    
# Modelo de Produto
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    product_link = db.Column(db.String(255), nullable=True)
    image_link = db.Column(db.String(255), nullable=True)
    price = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(50), nullable=False, default="available")
    gifter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    gifter = db.relationship("User", backref="thought_products")

# Modelo de Endereço
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cep = db.Column(db.String(10), nullable=False)
    street = db.Column(db.String(150), nullable=False)
    number = db.Column(db.String(10), nullable=False)
    complement = db.Column(db.String(50))
    neighborhood = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    reference_point = db.Column(db.String(150))

# Rota para obter endereço de entrega
@app.route('/address', methods=['GET'])
@jwt_required()
def get_address():
    user_identity = get_jwt_identity()
    user = User.query.get(user_identity["id"])

    # Verifica se o gifter é validado
    if user.role == "gifter" and user.status != "validated":
        return jsonify({"error": "Unauthorized"}), 403

    address = Address.query.first()
    if not address:
        return jsonify({"error": "Address not found"}), 404

    address_data = {
        "cep": address.cep,
        "street": address.street,
        "number": address.number,
        "complement": address.complement,
        "neighborhood": address.neighborhood,
        "city": address.city,
        "state": address.state,
        "reference_point": address.reference_point,
    }
    return jsonify(address_data), 200


# Rota para adicionar o endereço de entrega (somente Wisher e somente uma vez)
@app.route('/address', methods=['POST'])
@jwt_required()
def add_address():
    user_identity = get_jwt_identity()

    # Verifica se o usuário é um wisher
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    # Verifica se já existe um endereço no banco de dados
    if Address.query.first():
        return jsonify({"error": "Address already exists"}), 400

    data = request.get_json()
    try:
        new_address = Address(
            cep=data.get("cep"),
            street=data.get("street"),
            number=data.get("number"),
            complement=data.get("complement"),
            neighborhood=data.get("neighborhood"),
            city=data.get("city"),
            state=data.get("state"),
            reference_point=data.get("reference_point")
        )

        # Adiciona o novo endereço ao banco de dados
        db.session.add(new_address)
        db.session.commit()

        return jsonify({"message": "Address added successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to add address: {str(e)}"}), 500


# Rota de cadastro para 'Gifter'
app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(name=name, email=email, phone=phone, role='gifter', status='pending')

    db.session.add(new_user)
    db.session.commit()

    # Send welcome email to wishers
    try:
        wishers = User.query.filter_by(role='wisher').all()
        for wisher in wishers:
            email_to = wisher.email if isinstance(wisher.email, str) else wisher.email.decode("utf-8")
            subject = f"Valide o novo usuário! - {name}"
            print(f"Enviando e-mail para: {email_to}")
            EmailService.send_email(
                to=email_to,
                subject=subject
            )
    except Exception as e:
        print(f"Erro ao enviar o e-mail: {e}")

    return jsonify({"message": "User registered successfully", "role": "gifter", "status": "pending"}), 201

# Modified login route without password
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()

    if user:
        if user.status == "rejected":
            return jsonify({"error": "Account rejected"}), 403
        access_token = create_access_token(identity={"id": user.id, "role": user.role, "status": user.status})
        return jsonify({"token": access_token, "role": user.role, "status": user.status}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    
# Rota para envio do código de rastreio
@app.route('/tracking-code', methods=['POST'])
def send_tracking_code():
    data = request.get_json()
    tracking_code = data.get('tracking_code')

    if not tracking_code:
        return jsonify({"error": "Tracking code is required"}), 400

    try:
        wishers = User.query.filter_by(role='wisher').all()  # Busca todos os wishers
        for wisher in wishers:
            # Certifique-se de que o endereço de e-mail e o assunto são strings
            email_to = wisher.email if isinstance(wisher.email, str) else wisher.email.decode("utf-8")
            subject = f"Novo Código de Rastreio!"
            print(f"Enviando e-mail para: {email_to}")
            # Envia o e-mail com o código de rastreio
            EmailService.send_email(
                to=email_to,
                subject=subject,
                template="tracking-code.html",
                context={"tracking_code": tracking_code}
            )
        return jsonify({"message": "E-mail com o código de rastreio enviado com sucesso"}), 200
    except Exception as e:
        print(f"Erro ao enviar o e-mail de rastreio: {e}")
        return jsonify({"error": "Erro ao enviar o e-mail"}), 500

# Modified create-wisher route without password
@app.route('/create-wisher', methods=['POST'])
@jwt_required()
def create_wisher():
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_wisher = User(name=name, email=email, phone=phone, role='wisher', status='validated')

    db.session.add(new_wisher)
    db.session.commit()

    return jsonify({"message": "Wisher created successfully", "role": "wisher", "status": "validated"}), 201

# Modified create-first-wisher route without password
@app.route('/create-first-wisher', methods=['POST'])
def create_first_wisher():
    if User.query.filter_by(role='wisher').first():
        return jsonify({"error": "A Wisher already exists"}), 400

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    new_wisher = User(name=name, email=email, phone=phone, role='wisher', status='validated')

    db.session.add(new_wisher)
    db.session.commit()

    return jsonify({"message": "First Wisher created successfully", "role": "wisher", "status": "validated"}), 201

# Rota de verificação de token para checar o tipo de usuário
@app.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    user_identity = get_jwt_identity()
    user_id = user_identity["id"]
    user_role = user_identity["role"]
    return jsonify({"logged_in": True, "user_id": user_id, "role": user_role}), 200

# Rota para obter todos os usuários 'gifters' pendentes (acesso restrito ao Wisher)
@app.route('/pending-users', methods=['GET'])
@jwt_required()
def get_pending_gifters():
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    gifters = User.query.filter_by(role='gifter', status='pending').all()
    gifters_data = [{"id": g.id, "name": g.name, "email": g.email, "phone": g.phone} for g in gifters]
    return jsonify(gifters_data), 200

# Rota para validar um 'gifter'
@app.route('/users/<int:user_id>/validate', methods=['PATCH'])
@jwt_required()
def validate_gifter(user_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    gifter = User.query.get(user_id)
    if not gifter or gifter.role != "gifter":
        return jsonify({"error": "User not found or not a gifter"}), 404

    gifter.status = "validated"
    db.session.commit()

    return jsonify({"message": "User validated successfully"}), 200

# Rota para rejeitar um 'gifter' (exclui o usuário)
@app.route('/users/<int:user_id>/reject', methods=['DELETE'])
@jwt_required()
def reject_gifter(user_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    gifter = User.query.get(user_id)
    if not gifter or gifter.role != "gifter":
        return jsonify({"error": "User not found or not a gifter"}), 404

    db.session.delete(gifter)
    db.session.commit()

    return jsonify({"message": "User rejected and deleted successfully"}), 200

# Rota de criação de produtos para o Wisher
@app.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    title = data.get('title')
    product_link = data.get('product_link')
    image_link = data.get('image_link')
    price = data.get('price')

    new_product = Product(title=title, product_link=product_link, image_link=image_link, price=price)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product added successfully"}), 201

# Rota para obter todos os produtos (para wisher e gifters)
@app.route('/products', methods=['GET'])
@jwt_required()
def get_products():
    products = Product.query.all()
    products_data = [
        {
            "id": p.id,
            "title": p.title,
            "product_link": p.product_link,
            "image_link": p.image_link,
            "price": p.price,
            "status": p.status,
            "gifter_id": p.gifter_id
        }
        for p in products
    ]
    return jsonify(products_data), 200

# Rota para o gifter marcar um produto como "thinking" ou "purchased"
@app.route('/products/<int:product_id>/status', methods=['PATCH'])
@jwt_required()
def update_product_status(product_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "gifter":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    status = data.get('status')
    if status not in ["thinking", "purchased"]:
        return jsonify({"error": "Invalid status"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    product.status = status
    product.gifter_id = user_identity["id"] if status in ["thinking", "purchased"] else None
    db.session.commit()

    return jsonify({"message": f"Product marked as {status}"}), 200

# Rota para o wisher deletar um produto
@app.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200

# Rota para o wisher editar um produto
@app.route('/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def edit_product(product_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()
    product.title = data.get('title', product.title)
    product.product_link = data.get('product_link', product.product_link)
    product.image_link = data.get('image_link', product.image_link)
    product.price = data.get('price', product.price)
    db.session.commit()

    return jsonify({"message": "Product updated successfully"}), 200

# CRUD para Gifter
# Rota para obter todos os usuários (acesso restrito a Wisher)
@app.route('/gifters', methods=['GET'])
@jwt_required()
def get_gifters():
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    gifters = User.query.filter_by(role='gifter').all()
    gifters_data = [
        {
            "id": g.id,
            "name": g.name,
            "email": g.email,
            "phone": g.phone,
            "status": g.status  # Inclui o status do gifter
        }
        for g in gifters
    ]
    return jsonify(gifters_data), 200

# Rota para atualizar a senha de um usuário (restrita a Wisher)
@app.route('/update-password/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_password(user_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_password = data.get('password')
    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200

# CRUD para Wisher
# Rota para editar o próprio perfil (restrito ao próprio Wisher)
@app.route('/wisher/<int:wisher_id>', methods=['PUT'])
@jwt_required()
def update_wisher(wisher_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher" or user_identity["id"] != wisher_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    wisher = User.query.get(wisher_id)
    if not wisher or wisher.role != "wisher":
        return jsonify({"error": "User not found or not a wisher"}), 404

    wisher.name = data.get('name', wisher.name)
    wisher.email = data.get('email', wisher.email)
    wisher.phone = data.get('phone', wisher.phone)
    db.session.commit()

    return jsonify({"message": "Wisher updated successfully"}), 200

# Rota para deletar o próprio perfil (restrito ao próprio Wisher)
@app.route('/wisher/<int:wisher_id>', methods=['DELETE'])
@jwt_required()
def delete_wisher(wisher_id):
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher" or user_identity["id"] != wisher_id:
        return jsonify({"error": "Unauthorized"}), 403

    wisher = User.query.get(wisher_id)
    if not wisher or wisher.role != "wisher":
        return jsonify({"error": "User not found or not a wisher"}), 404

    db.session.delete(wisher)
    db.session.commit()
    return jsonify({"message": "Wisher deleted successfully"}), 200

@app.route('/products/pix', methods=['POST'])
@jwt_required()
def add_pix_product():
    user_identity = get_jwt_identity()

    # Verifica se o usuário é um gifter
    if user_identity["role"] != "gifter":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    title = data.get('title')

    # Permite apenas a criação de produtos com o título "Chave PIX"
    if title != "Chave PIX":
        return jsonify({"error": "Invalid product title"}), 400

    new_product = Product(
        title=title,
        product_link=None,  # Garantir que links personalizados não sejam usados
        image_link=None,  # Garantir que imagens personalizadas não sejam usadas
        price="Valor Livre",  # Define um preço padrão
        gifter_id=user_identity["id"],  # Usa o ID do gifter autenticado
        status="purchased"  
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product added successfully"}), 201


# Inicializa o banco de dados
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
