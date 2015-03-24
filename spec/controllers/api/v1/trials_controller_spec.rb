require 'rails_helper'

RSpec.describe Api::V1::TrialsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "returns all trials" do
      Trial.create(name: "Asthma Study", description: "This is an asthma study", location: "Raleigh", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true)
      get :index
      json = JSON.parse(response.body)
      expect(json.length).to eq(1)
    end
  end

  describe "#update" do
    it "updates attributes" do
      Trial.create(name: "Asthma Study", description: "This is an asthma study", location: "Raleigh", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true)
      Trial.last.update(name: "New Asthma Study")
      expect(Trial.last.name).to eq("New Asthma Study")
    end
  end
end
