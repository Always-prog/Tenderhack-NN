from flask import request, jsonify
# TODO:
"""
1. Реализовать подключение к таблицам баз данных контрактов через SQLAlchemy.
2. Реализовать поиск по фильтрам
"""
from app import db, app
from supplier import Supplier
import numpy


@app.route("/search", methods=["GET"])
def search_suppliers():
    """
    TODO: Реализовать поиск по ИНН или по тексту продажи.
    TODO: Реализовать возврат в формате данных о поставщике вместе с его рейтигном (рейтинг надо считать)
    """
    
    result = ''
    
    inn = request.args.get('inn')
    kpgz = request.args.get('kpgz')

    if inn or kpgz:
        data = []

        suppliers = Supplier.search(db.session(), inn, kpgz)

        data = [{
            'inn': supp[0],
            'kpgz': supp[1]
        } for supp in suppliers ]

        result = jsonify(data)

    
    return result