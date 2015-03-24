require 'rails_helper'

RSpec.describe Condition, type: :model do
  it "finds results by condition name" do
    matching_trial = Trial.create(name: "Diabetes Study", description: "This is a diabetes study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day,
    primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "diabetes"}] )

    _non_matching_trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}])

    results = Trial.search("diabetes")

    expect(results).to eq([matching_trial])
  end

  describe "#trials" do
    it "only returns trials that aren't excluded" do
      included_trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}], exclusions_attributes:)
      _non_included = Trial.create(name: "bronchitis study", description: "bronchitis study", location: "New York, NY", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "bronchitis"}])

      results = Trial.search("asthma")

      expect(results).to match_array([condition_match])
    end
  end

  end
