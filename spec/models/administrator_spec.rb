require 'rails_helper'

RSpec.describe Administrator, type: :model do
  it "is invalid without an email" do
    expect(Administrator.new().valid?).to eq false
  end

  it "is invalid without a password" do
    expect(Administrator.new(email: "ashley@email.com").valid?).to eq false
  end
end
