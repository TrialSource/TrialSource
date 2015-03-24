class Api::V1::SessionsController < ApplicationController

	def create
		login = Login.find_by_email(params[:email])
		if login && login.authenticate(params[:password])
			make_session(login.user_id, login.user_type)
			render json: [session[:user_id], session[:user_type]]
		else
			render json: "Invalid parameters"
		end
	end

	def destroy
		session[:user_id] = nil
		session[:user_type] = nil
		render json: "Log out successful"
	end


	private

	 def make_session(user_id,user_type)
		session[:user_id] = user_id
	  session[:user_type] = user_type
	 end
end
