require 'rails_helper'

RSpec.describe Doctor, type: :model do
  let(:doctor) {create(:doctor)}
  let!(:_non_matching_doctor) {create(:doctor, first_name: "Suzy", last_name: "Johnson")}

  describe "#search" do
    it "finds results by first name" do
      results = Doctor.search("Bill")

      expect(results).to eq([doctor])
    end

    it "find results by last name" do
      results = Doctor.search("Smith")

      expect(results).to eq([doctor])
    end

    it "finds results for both attributes" do
      first_name_match = Doctor.create(first_name: "Smith")
      results = Doctor.search("Smith")

      expect(results).to match_array([first_name_match, doctor])
    end
  end
end
