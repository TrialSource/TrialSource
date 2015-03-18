require 'rails_helper'

RSpec.describe Api::V1::DoctorsController, type: :controller do
	describe "#create" do
	    context "when doctor is valid" do
	      it "sends back doctor attributes" do
	        post :create, doctor: {first_name: "Bill", last_name: "Smith", login_attributes: {email: "duke_doctor@example.org", password: "password"}}
    			json = JSON.parse(response.body)
    			expect(json.keys).to include("last_name")

	      end
	    end

	    # context "when doctor is invalid" do
	    #   it "sends back invalid parameters" do
	    #     post :create, doctor: {login: nil}
    	# 		json = JSON.parse(response.body)
    	# 		expect(json).to include('Invalid parameters')
	    #   end
	    # end
	end
end
