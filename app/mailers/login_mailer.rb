class LoginMailer < ActionMailer::Base
  default from: 'notifications@trialsource.herokuapp.com'

  # def welcome_email(login)#, subject)
  #   @login = login
  #   # @login = login
  #   #@url = 'https://trialsource.herokuapp.com/'
  #   mail(to: @login.email, subject: 'Welcome to TrialSource!')
  # end

  def welcome_email(doctor)
    @doctor = doctor.login
    @url = 'https://trialsource.herokuapp.com/'
    mail(to: @doctor.email, subject: 'Welcome to TrialSource!')
  end

end
