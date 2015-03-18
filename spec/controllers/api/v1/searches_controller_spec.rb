require 'rails_helper'

RSpec.describe Api::V1::SearchesController, type: :controller do

  describe "#show" do
    context "search for doctor" do
      it "returns matching doctor" do
        Doctor.create(first_name: "Bill")
        Doctor.create(first_name: "Suzy")

        #send request to the controller
        get :show, query: "Bill"
        json = JSON.parse(response.body)

        results = json["searches"]
        first_doctor = results[0]
        expect(first_doctor["first_name"]).to eq("Bill")
        expect(results.length).to eq(1)
      end
    end
  end
end
