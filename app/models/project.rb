class Project < ApplicationRecord
  belongs_to :team
  has_many :roles
  has_many :users, through: :roles
  has_many :tickets, dependent: :destroy
end

