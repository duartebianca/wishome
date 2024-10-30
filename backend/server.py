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

# Inicializa o banco de dados
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
