require 'rails_helper'

RSpec.describe Condition, type: :model do
  it "finds results by condition name" do
    matching_trial = Trial.create(name: "Diabetes Study", description: "This is a diabetes study", location: "Raleigh", start_on: Date.today, estimated_completed_on: Date.today + 1.day,
    primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "diabetes"}] )

    _non_matching_trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}])

    results = Trial.search("diabetes")

    expect(results).to eq([matching_trial])
  end

  describe "#included_trials" do
    it "only returns trials that aren't excluded" do
      included_trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}], exclusions_attributes: [{name: "diabetes"}])
      excluded_trial = Trial.create(name: "other asthma study", description: "asthma study", location: "New York, NY", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}], exclusions_attributes: [{name: "heart conditions"}])

      results = Condition.matching_trials("asthma", excluded_trial.exclusions.first.id.to_s, "Durham,NC", 50)

      expect(results).to match_array([included_trial])
    end
  end

  describe "#increase_search_count" do
    it "increases the number of searches for a condition" do
      trial = Trial.create(name: "asthma study", description: "asthma study", location: "Durham, NC", primary_contact_email: "bill@example.com",principal: "Bill Smith", active: true, conditions_attributes: [{name: "asthma"}])
      condition = Condition.last
      condition.increase_search_count

      expect(condition.number_of_searches).to eq(1)
    end
  end

end
