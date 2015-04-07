require 'rails_helper'

RSpec.describe Condition, type: :model do
  let(:trial) {create(:trial_with_condition)}
  let!(:_non_matching_trial) {create(:trial, name: "asthma study", description: "this is an asthma study", conditions_attributes: [{name: "ashtma"}])}

  it "finds results by condition name" do
    results = Trial.search("diabetes")

    expect(results).to eq([trial])
  end

  describe "#included_trials" do
    it "only returns trials that aren't excluded" do
      included_trial = create(:trial, conditions_attributes: [{name: "diabetes"}], exclusions_attributes: [{name: "asthma"}])
      excluded_trial = create(:trial, exclusions_attributes: [{name: "heart conditions"}])

      results = Condition.matching_trials("diabetes", excluded_trial.exclusions.first.id.to_s, "Durham,NC", 50)

      expect(results).to match_array([included_trial])
    end
  end

  describe "#increase_search_count" do
    it "increases the number of searches for a condition" do
      condition = trial.conditions.first
      condition.increase_search_count

      expect(condition.number_of_searches).to eq(1)
    end
  end

end
