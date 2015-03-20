class Api::V1::SessionsController < ApplicationController

	def create
	 	login = Login.find_by_email(params[:email])
	 	if login.authenticate(params[:password])
	 		make_session(login.user_id, login.user_type)
			render json: [session[:user_id], session[:user_type]]
	 	else
	 		render json: "Invalid parameters"
	 	end
  end



	private

	  def make_session(user_id,user_type)
	    session[:user_id] = user_id
	    session[:user_type]= user_type
	  end
end
