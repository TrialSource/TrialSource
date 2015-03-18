require 'rails_helper'

RSpec.describe Trial, type: :model do
  it "is invalid without a name" do
    expect(Trial.new().valid?).to eq false
  end

  it "is invalid without a condition" do
    expect(Trial.new(name: "asthma study").valid?).to eq false
  end

  it "is invalid without a description" do
    expect(Trial.new(name: "asthma study", condition: "asthma").valid?).to eq false
  end

  it "is invalid without a location" do
    expect(Trial.new(name: "asthma study", condition: "asthma", description: "asthma study").valid?).to eq false
  end
end
