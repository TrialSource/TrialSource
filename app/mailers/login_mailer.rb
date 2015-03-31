class LoginMailer < ActionMailer::Base
  default from: 'notifications@trialsource.herokuapp.com'

  def welcome_email(doctor)
    @doctor = doctor.login
    @url = 'https://www.trialsource.org'
    mail(to: @doctor.email, subject: 'Welcome to TrialSource!')
  end

end
