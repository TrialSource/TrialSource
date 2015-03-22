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
      condition_match = Trial.create(name: "asthma study", description: "asthma study", condition: "asthma", location: "Durham, NC")
      _non_matching = Trial.create(name: "not an asthma study", description: "bronchitis study", location: "New York, NY")

      results = Trial.search("asthma")

      expect(results).to match_array([condition_match])
    end
  end
end
