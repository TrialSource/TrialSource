# Preview all emails at http://localhost:3000/rails/mailers/login_mailer
class LoginMailerPreview < ActionMailer::Preview
  def welcome_mail_preview
    LoginMailer.welcome_email(Login.first)
  end
end
