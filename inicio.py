from flask import Flask, request, send_file, jsonify
from flask_cors import CORS  # Importa CORS
from pydub import AudioSegment
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["OUTPUT_FOLDER"] = "outputs"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
os.makedirs(app.config["OUTPUT_FOLDER"], exist_ok=True)

@app.route("/convert", methods=["POST"])
def convert():
    if "file" not in request.files:
        return jsonify({"error": "No se proporcionó ningún archivo"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Nombre de archivo vacío"}), 400
    
    try:
        # Guardar el archivo subido
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(input_path)
        
        # Convertir a MP3
        output_filename = f"{os.path.splitext(filename)[0]}.mp3"
        output_path = os.path.join(app.config["OUTPUT_FOLDER"], output_filename)
        audio = AudioSegment.from_file(input_path)
        audio.export(output_path, format="mp3")
        
        # Eliminar archivo original
        os.remove(input_path)
        
        return send_file(output_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": f"Error al convertir: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
