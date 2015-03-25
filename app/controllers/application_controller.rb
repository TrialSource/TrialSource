class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  skip_before_action :verify_authenticity_token, if: :json_request?


  def number_of_trials
    Trial.all.count
  end

  def number_of_organizations
    Organization.all.count
  end

  def authenticate_user
    if session[:user_id] == nil
      redirect_to root_path, notice: "You must be logged in to see that page"
    end
  end

  protected

  def json_request?
    request.format.json?
  end
end
