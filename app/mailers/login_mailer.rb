class LoginMailer < ApplicationMailer
  default from: 'notifications@trialsource.herokuapp.com'

  def welcome_email(login)
    @login = login
    #@url = 'https://trialsource.herokuapp.com/'
    mail(to: @login.email, subject: 'Welcome to TrialSource!')
  end
end
