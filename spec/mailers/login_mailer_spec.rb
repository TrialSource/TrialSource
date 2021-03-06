require 'spec_helper'
# require "rails_helper"

RSpec.describe LoginMailer, type: :mailer do
  before :each do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
    @login = FactoryGirl.create(:login)
    LoginMailer.welcome_email(@login).deliver_now
  end

  after :each do
    ActionMailer::Base.deliveries.clear
  end

  it 'should send an email' do
    expect(ActionMailer::Base.deliveries.count).to eq 1
  end

  it 'renders the receiver email' do
    expect(ActionMailer::Base.deliveries.first.to).to eq [@login.email]
  end

  it 'should set the subject to the correct subject' do
    expect(ActionMailer::Base.deliveries.first.subject).to eq 'Welcome to TrialSource!'
  end

  it 'displays the sender email' do
    expect(ActionMailer::Base.deliveries.first.from).to eq ['notifications@trialsource.herokuapp.com']
  end
end
