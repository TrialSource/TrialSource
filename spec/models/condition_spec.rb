require 'rails_helper'

RSpec.describe Condition, type: :model do
  it "finds results by condition name" do
    matching_trial = Trial.create(name: "Diabetes Study", description: "This is a diabetes study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day,
         number_of_views: 0, number_of_appearances: 0, doctor_id: 3, conditions_attributes: [{name: "diabetes"}] )

    _non_matching_trial = Trial.create(name: "Asthma Study", description: "This is an asthma study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day, number_of_views: 0, number_of_appearances: 0, doctor_id: 3)

    results = Trial.search("diabetes")

    expect(results).to eq([matching_trial])
  end
  # context "search for condition" do
  #   it "returns matching trials based on conditions" do
  #     Trial.create(name: "Asthma Study", description: "This is an asthma study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day, number_of_views: 0, number_of_appearances: 0, doctor_id: 3)
  #     Trial.create(name: "Diabetes Study", description: "This is a diabetes study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day,
  #     number_of_views: 0, number_of_appearances: 0, doctor_id: 3, conditions_attributes: [{name: diabetes}] )
  #
  #     get :show, type: "Condition", query: "Diabetes"
  #     json = JSON.parse(response.body)
  #
  #     results = json["searches"]
  #     first_doctor = results[0]
  #     expect(first_doctor["first_name"]).to eq("Bill")
  #     expect(results.length).to eq(1)
  #   end
  # end
  end
