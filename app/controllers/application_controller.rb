class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.


  def authenticate_user
    if session[:user_id] == nil
      return false
    end
  end
end
