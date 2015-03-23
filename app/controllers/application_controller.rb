class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def number_of_trials
    Trial.all.count
  end

  def authenticate_user
    if session[:user_id] == nil
      return false
    end
  end
end
