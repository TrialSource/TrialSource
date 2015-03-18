# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

file = "db/seed_data.csv"

hospitals = ["Duke Med", "WakeMed", "UNC", "UCSF Hospital", "Johns Hopkins",
  "Mayo Clinic", "UCLA Medical Center" ]

 100.times do
  org_name = hospitals.sample
  Organization.create(
  :org_name => "#{org_name}",
  :login_attributes => {
    :email => "#{org_name.split.join("_").downcase}@hospital.com",
    :password => "password"
  }
  )
end

orgs = Organization.all

1000.times do
  first_name = Faker::Name.first_name
  Doctor.create(
    :first_name => "#{first_name}",
    :last_name => "#{Faker::Name.last_name}",
    :organization_id => orgs.sample,
    :login_attributes => {
      :email => "#{first_name}@gmail.com",
      :password => "password"
    }
  )
end
doctors = Doctor.all

CSV.foreach(file, :headers => true) do |row|
  Trial.create(
    :name => row[1],
    :description => row[2],
    :condition => row[3],
    :start_on => row[4],
    :estimated_completed_on => row[5],
    :location => "#{Faker::Address.street_address}, #{Faker::Address.city}, #{Faker::Address.state}",
    :doctor_id => doctors.sample
  )
end
