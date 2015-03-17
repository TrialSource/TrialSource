require 'rails_helper'

RSpec.describe Api::V1::DoctorsController, type: :controller do
	describe "#create" do
	    context "when doctor is valid" do
	      it "sends back doctor attributes" do
	        post :create, doctor: {email: "duke_doctor@example.org", password_digest: "password"}
      		expect(response).to be_success            
    		json = JSON.parse(response.body)
    		expect(json['doctor'].length).to eq(1)

	      end
	    end

	    context "when doctor is invalid" do
	      it "sends back invalid parameters" do
	        post :create, doctor: {email: nil}
    		json = JSON.parse(response.body)
    		expect(json).to include('Invalid parameters')
	      end
	    end
	end
end
