require 'rails_helper'

RSpec.describe Api::V1::TrialsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "returns all trials" do
      Trial.create(name: "Asthma Study", condition: "asthma", description: "This is an asthma study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day, number_of_views: 0, number_of_appearances: 0, doctor_id: 3)
      get :index
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
    end
  end

end
