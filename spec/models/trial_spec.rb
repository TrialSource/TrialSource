require 'rails_helper'

RSpec.describe Trial, type: :model do
  let(:trial) {create(:trial)}

  it "is invalid without a name" do
    expect(build(:trial, name: nil).valid?).to eq false
  end

  it "is invalid without a description" do
    expect(build(:trial, description: nil).valid?).to eq false
  end

  it "is invalid without a location" do
    expect(build(:trial, location: nil).valid?).to eq false
  end

  describe "#search" do
    it "finds results by attributes" do
      _non_matching = create(:trial, name: "asthma study", description: "this is an asthma study", conditions_attributes: [{name: "ashtma"}])

      results = Trial.search("diabetes")

      expect(results).to match_array([trial])
    end
  end

  describe "#increase_appearance_count" do
    it "increases the number of appearances for a trial" do
      trial.increase_appearance_count

      expect(trial.number_of_appearances).to eq(1)
    end
  end

  describe "#increase_view_count" do
    it "increases the number of views for a trial" do
      trial.increase_view_count

      expect(trial.number_of_views).to eq(1)
    end
  end

end
