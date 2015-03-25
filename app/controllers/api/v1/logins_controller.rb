class Api::V1::LoginsController < ApplicationController

	def create
	  @login = Login.new(login_params)
	  if @login.save
			LoginMailer.welcome_email(@login).deliver_now
	    render json: @login
	  else
	    render json: "Invalid parameters"
	  end
	end

	private

	  def set_login
	    @login = Login.find(params[:id])
	  end

	  def login_params
	    params.require(:login).permit(:email, :password_digest)
	  end

end
