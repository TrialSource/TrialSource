class LoginMailer < ActionMailer::Base
  default from: 'notifications@trialsource.org'

  def welcome_email(doctor)
    @doctor = doctor.login
    @url = 'https://trialsource.org/'
    mail(to: @doctor.email, subject: 'Welcome to TrialSource!')
  end

end
