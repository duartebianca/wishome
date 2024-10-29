from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import secrets

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = secrets.token_hex(32)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Modelo do usuário com o campo 'role' para diferenciar 'gifter' e 'wisher'
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='gifter')  # gifter por padrão

# Modelo de Produto
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    product_link = db.Column(db.String(255), nullable=True)
    image_link = db.Column(db.String(255), nullable=True)
    price = db.Column(db.String(50), nullable=True)
    status = db.Column(db.String(50), nullable=False, default="available")  # available, thinking, purchased
    gifter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # id do gifter associado ao produto
    gifter = db.relationship("User", backref="thought_products")

# Rota de cadastro para 'Gifter'
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, phone=phone, password=hashed_password, role='gifter')

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "role": "gifter"}), 201

# Rota de criação de Wisher (restrita a usuários Wisher)
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
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_wisher = User(name=name, email=email, phone=phone, password=hashed_password, role='wisher')

    db.session.add(new_wisher)
    db.session.commit()

    return jsonify({"message": "Wisher created successfully", "role": "wisher"}), 201

# Rota de login com inclusão do 'role' no token
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={"id": user.id, "role": user.role})
        return jsonify({"token": access_token, "role": user.role}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Rota de verificação de token para checar o tipo de usuário
@app.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    user_identity = get_jwt_identity()
    user_id = user_identity["id"]
    user_role = user_identity["role"]
    return jsonify({"logged_in": True, "user_id": user_id, "role": user_role}), 200

# CRUD para Gifter
# Rota para obter todos os usuários (acesso restrito a Wisher)
@app.route('/gifters', methods=['GET'])
@jwt_required()
def get_gifters():
    user_identity = get_jwt_identity()
    if user_identity["role"] != "wisher":
        return jsonify({"error": "Unauthorized"}), 403

    gifters = User.query.filter_by(role='gifter').all()
    gifters_data = [{"id": g.id, "name": g.name, "email": g.email, "phone": g.phone} for g in gifters]
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

# Rota para criar o primeiro Wisher
@app.route('/create-first-wisher', methods=['POST'])
def create_first_wisher():
    if User.query.filter_by(role='wisher').first():
        return jsonify({"error": "A Wisher already exists"}), 400

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_wisher = User(name=name, email=email, phone=phone, password=hashed_password, role='wisher')

    db.session.add(new_wisher)
    db.session.commit()

    return jsonify({"message": "First Wisher created successfully", "role": "wisher"}), 201



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
    product.gifter_id = user_identity["id"] if status == "thinking" or status == "purchased" else None
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

# Inicializa o banco de dados
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)