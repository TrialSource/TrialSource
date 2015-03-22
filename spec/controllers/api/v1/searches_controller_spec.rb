require 'rails_helper'

RSpec.describe Api::V1::SearchesController, type: :controller do

  describe "#show" do
    context "search for doctor" do
      it "returns matching doctor" do
        Doctor.create(first_name: "Bill")
        Doctor.create(first_name: "Suzy")

        get :show, type: "Doctor", query: "Bill"
        json = JSON.parse(response.body)

        results = json["searches"]
        first_doctor = results[0]
        expect(first_doctor["first_name"]).to eq("Bill")
        expect(results.length).to eq(1)
      end
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
end
