require 'rails_helper'

RSpec.describe Trial, type: :model do
  it "is invalid without a name" do
    expect(Trial.new().valid?).to eq false
  end

  it "is invalid without a description" do
    expect(Trial.new(name: "asthma study").valid?).to eq false
  end

  it "is invalid without a location" do
    expect(Trial.new(name: "asthma study", description: "asthma study").valid?).to eq false
  end

  describe "#search" do
    it "finds results by attributes" do
      condition_match = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}])
      _non_matching = Trial.create(name: "bronchitis study", description: "bronchitis study", location: "New York, NY", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "bronchitis"}])

      results = Trial.search("asthma")

      expect(results).to match_array([condition_match])
    end
  end

  describe "#search_appearance" do
    it "increases the number of appearances for a trial" do
      trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}])
      trial.search_appearance

      expect(trial.number_of_appearances).to eq(1)
    end
  end
end
