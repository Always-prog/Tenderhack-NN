from flask import request, jsonify
from sqlalchemy import func

from app import db, app
from models import Contracts, Ks
from supplier import Supplier, search_suppliers_by_kpgzs


@app.route("/search", methods=["GET"])
def search_suppliers():
    """
    TODO: Реализовать поиск по ИНН или по тексту продажи.
    TODO: Реализовать возврат в формате данных о поставщике вместе с его рейтигном (рейтинг надо считать)
    """

    
    inn = request.args.get('inn')
    kpgzs = request.args.get('kpgzs')
    exp_weight = int(request.args.get('exp_weight', 1))
    act_weight = int(request.args.get('act_weight', 1))
    rel_weight = int(request.args.get('rel_weight', 1))
    sped_weight = int(request.args.get('sped_weight', 1))
    if kpgzs:
        kpgzs = kpgzs.split(',')

    def supplier_sort_key(supplier: Supplier):
        exp = supplier.experience_metric() * exp_weight
        act = supplier.activity_metric() * act_weight
        rel = supplier.reliability_metric() * rel_weight
        sped = supplier.speedily_metric() * sped_weight
        return exp + act + sped + rel

    if inn:
        return [Supplier(int(inn)).supplier_info]

    if kpgzs:
        suppliers = search_suppliers_by_kpgzs(kpgzs)
        suppliers.sort(key=supplier_sort_key, reverse=True)
        return jsonify([supp.supplier_info for supp in suppliers])

    return jsonify([])


@app.route("/compare/bymarket", methods=["GET"])
def compare_bymarket():
    """
    На вход приходит inn и фильтр по kpgz (обязательно).
    TODO: Реализовать сравнение с рынком возврат данных в формате {
        "target_inn": <исконный ИНН>,
        "target_avg_price": средняя цена по ИНН,
        "market_avg_price": средняя цена по рынку
    }
    """

    target_inn = request.args.get('inn')
    kpgzs = request.args.get('kpgzs')
    if kpgzs:
        kpgzs = kpgzs.split(',')

    target_query = db.session.query(func.avg(Contracts.price)).join(Ks, Contracts.ks_id == Ks.ks_id)
    market_query = db.session.query(func.avg(Contracts.price)).join(Ks, Contracts.ks_id == Ks.ks_id)

    target_query = target_query.filter(Contracts.supplier_inn == int(target_inn))

    if kpgzs:
        target_query = target_query.filter(Ks.kpgz.in_(kpgzs))
        market_query = market_query.filter(Ks.kpgz.in_(kpgzs))

    return {
        'target_inn': target_inn,
        'target_avg_price': target_query.all()[0][0],
        'market_avg_price': market_query.all()[0][0]
    }


@app.route("/compare/bygroup", methods=["GET"])
def compare_bygroup():
    """
    на выход список INN через запятую и фильтр по kpgz
    TODO: Реализовать сравнение друг с другом. Ровно как и с маркетом, только сравнение нужно делать каждого,
    и среди среза внутри пришедших ИНН.
    Результат должен быть вида: [
    {inn: инн, avg_price: цена},
    {inn: инн2, avg_price: цена},
    {inn: инн3, avg_price: цена},
    ]
    """

    inns = request.args.get('inns')
    kpgzs = request.args.get('kpgzs')
    if not inns:
        return []

    inns = [int(inn) for inn in inns.split(',')]

    if kpgzs:
        kpgzs = kpgzs.split(',')

    query = db.session.query(Contracts.supplier_inn, func.avg(Contracts.price)).join(Ks, Contracts.ks_id == Ks.ks_id)
    query = query.group_by(Contracts.supplier_inn)
    query = query.filter(Contracts.supplier_inn.in_(inns))

    if kpgzs:
        query = query.filter(Ks.kpgz.in_(kpgzs))

    return [{
        'inn': row[0],
        'avg_price': row[1],
    } for row in query.all()]
