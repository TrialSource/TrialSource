# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'
exclusions = "db/exclusions.csv"
conditions = "db/conditions.csv"
trials = "db/trials.csv"
organizations = "db/organizations.csv"
doctors = "db/doctors.csv"
logins = "db/logins.csv"
exclusions_trials = "db/exclusions-trials.csv"
conditions_trials = "db/conditions-trials.csv"


CSV.foreach(trials, :headers => true) do |row|
  trial = Trial.create(
    :name => row[2],
    :description => row[3],
    :location => row[4],
    :start_on => row[5],
    :estimated_completed_on => row[6],
    :doctor_id => row[9],
    :archived => row[12],
    :primary_contact_email => row[13],
    :principal => row[14],
    :active => row[15],
    :longitude => row[16],
    :latitude => row[17],
  )
  trial.id = row[1]
  trial.save!
end

CSV.foreach(conditions, :headers => true) do |row|
  condition = Condition.create(
    :name => row[2],
    :number_of_searches => row[5]
  )
  condition.id = row[1]
  condition.save!
end

CSV.foreach(exclusions, :headers => true) do |row|
  exclusion = Exclusion.create(
    :name => row[2],
  )
  exclusion.id = row[1]
  exclusion.save!
end

CSV.foreach(doctors, :headers => true) do |row|
  doctor = Doctor.create(
    :first_name => row[4],
    :last_name => row[5],
    :organization_id => row[6]
  )
  doctor.id = row[1]
  doctor.save!
end

CSV.foreach(organizations, :headers => true) do |row|
  organization = Organization.create(
    :org_name => row[4],
  )
  organization.id = row[1]
  organization.save!
end

CSV.foreach(exclusions-trials, :headers => true) do |row|
  e= Exclusion.find(row[2])
  e.trials << Trial.find(row[3])
end

CSV.foreach(conditions-trials, :headers => true) do |row|
  c= Condition.find(row[2])
  c.trials << Trial.find(row[3])
end

CSV.foreach(logins, :headers => true) do |row|
  login = Login.create(
    :email => row[2],
    :password => "password",
    :user_id => row[6],
    :user_type => row[7]
  )
  login.id = row[1]
  login.save!
end
