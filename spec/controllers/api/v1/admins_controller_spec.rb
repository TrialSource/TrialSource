require 'rails_helper'

RSpec.describe Api::V1::AdminsController, type: :controller do
	describe "#create" do
	    context "when admin is valid" do
	      it "sends back admin attributes" do
	        post :create, admin: {email: "duke@example.org", password_digest: "password"}
      		expect(response).to be_success            
    		json = JSON.parse(response.body)
    		expect(json['admin'].length).to eq(1)
	      end
	    end

		context "when admin is invalid" do
	      it "sends back invalid parameters" do
	        post :create, admin: {email: nil}
        	expect(response.status).to eq(400)

	      end
	    end
	end
end
