from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.db.database import Base

class User(Base):
    __tablename__ ="users"
    id = Column(Integer, primary_key=True, index=True )
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)

    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="users")


class Company(Base):
    __tablename__="companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    industry = Column(String, nullable=True)
    description = Column(String, nullable=False)
    
    users = relationship("User", back_populates="company")
    products = relationship("Product", back_populates="company", cascade="all,delete-orphan")

class Product(Base):
    __tablename__="products"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    name = Column(String, nullable=False)
    product_category = Column(String, nullable=True)
    description = Column(String, nullable=False)
    target_industry = Column(String, nullable=True)
    
    company = relationship("Company", back_populates="products")