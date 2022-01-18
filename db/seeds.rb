# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "destorying users"
Team.destroy_all

puts "destroying memberships"
Membership.destroy_all

puts 'Destroying Projects'
Project.destroy_all

puts "destroying tickets"
Ticket.destroy_all

puts 'destroying users'
User.destroy_all