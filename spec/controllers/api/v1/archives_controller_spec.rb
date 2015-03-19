require 'rails_helper'

RSpec.describe Api::V1::ArchivesController, type: :controller do

  describe "GET #index" do
    it "returns all archived trials" do
      Trial.create(name: "Asthma Study", condition: "asthma", description: "This is an asthma study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day, number_of_views: 0, number_of_appearances: 0, doctor_id: 3)
      Trial.first.update(archived: true)
      expect(Trial.first.archived).to eq(true)
    end
  end
end
