from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import re

app = Flask(__name__)
cors = CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'graph'

mysql = MySQL(app)


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    print("here")
    if file and file.filename.endswith('.txt'):
        content = file.read().decode('utf-8')
        print(content)
        # Extract integers from the text file content
        numbers = re.findall(r'\d+', content)
        # Connect to the MySQL database and insert the numbers
        cur = mysql.connection.cursor()
        for number in numbers:
            cur.execute("INSERT INTO id (number) VALUES (%s)", (number,))
        mysql.connection.commit()
        cur.close()
        return 'File uploaded and numbers stored in database', 200
    else:
        return jsonify({"error": "Invalid file format. Only .txt files are allowed"}), 400


@app.route('/get_values', methods=['GET'])
def get_values():
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT * FROM id ORDER BY number DESC")
        result = cur.fetchall()
        print(result)
        values = [row[0] for row in result]
        print(values)
        return jsonify(values), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
