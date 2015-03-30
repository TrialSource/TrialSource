class NotificationMailer < ActionMailer::Base
  default from: 'notifications@trialsource.herokuapp.com'

  def notification_email(notification)
    @notification = notification
    #@url = 'http://www.trialsource.com'
    mail(to: @notification.email, subject: 'New Trial on TrialSource')
  end
end
