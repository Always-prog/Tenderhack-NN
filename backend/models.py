

# Подключить используя SQLAlchemy таблички поставщиков

from sqlalchemy import Column, Integer, Numeric,String, TIMESTAMP, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Contracts(Base):
    __tablename__ = 'contracts'

    ks_id = Column(Integer, unique=True)
    contract_id = Column(Integer, primary_key=True, unique=True)
    conclusion_date = Column(TIMESTAMP)
    price = Column(Numeric)
    customer_inn = Column(Integer)
    customer_kpp = Column(Integer)
    supplier_inn = Column(Integer)
    supplier_kpp = Column(Integer)
    violations = Column(Text)
    status = Column(Boolean)


class Blocking(Base):
    __tablename__ = 'blocking'

    id = Column(Integer, primary_key=True)
    supplier_inn = Column(Integer)
    supplier_kpp = Column(Integer)
    reason = Column(Text)
    blocking_start_date = Column(TIMESTAMP)
    blocking_end_date = Column(TIMESTAMP)


class ContractExecution(Base):
    __tablename__ = 'contract_execution'

    contract_id = Column(Integer, primary_key=True, unique=True)
    upd_id = Column(Integer)
    scheduled_delivery_date = Column(TIMESTAMP)
    actual_delivery_date = Column(TIMESTAMP)
    supplier_inn = Column(Integer)
    supplier_kpp = Column(Integer)
    customer_inn = Column(Integer)
    customer_kpp = Column(Integer)


class Ks(Base):
    __tablename__ = 'ks'

    participant_inn = Column(Integer)
    participant_kpp = Column(Integer)
    is_winner = Column(Boolean)
    ks_id = Column(Integer, primary_key=True)
    publish_date = Column(TIMESTAMP)
    price = Column(Numeric)
    customer_inn = Column(Integer)
    customer_kpp = Column(Integer)
    customer_type = Column(Text)

    kpgz = Column(Text)
    name = Column(Text)
    items = Column(Text)
    region_code = Column(Integer)
    violations = Column(Text)
