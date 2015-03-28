require 'rails_helper'

RSpec.describe NotificationMailer, type: :mailer do

  before :each do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
    @notification = FactoryGirl.create(:notification)
    NotificationMailer.notification_email(@notification).deliver_now
  end

  after :each do
    ActionMailer::Base.deliveries.clear
  end

  it 'should send an email' do
    expect(ActionMailer::Base.deliveries.count).to eq 1
  end

  it 'displays the recipient email' do
    expect(ActionMailer::Base.deliveries.first.to).to eq [@notification.email]
  end

  it 'should set the subject to the correct subject' do
    expect(ActionMailer::Base.deliveries.first.subject).to eq 'New Trial on TrialSource'
  end

  it 'displays the sender email' do
    expect(ActionMailer::Base.deliveries.first.from).to eq ['notifications@trialsource.herokuapp.com']
  end
end
