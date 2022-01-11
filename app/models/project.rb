class Project < ApplicationRecord
  has_many :roles
  has_one :roles
  has_many :users, through: :roles
  has_many :tickets
end
