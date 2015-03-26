class Api::V1::NotificationsController < ApplicationController

  def create
    notification = Notification.new(notification_params)
    if notification.save
      render json: notification
    else
      render json: "Invalid Parameters"
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:email, :condition, :condition_id, :exclusion_ids => [])
  end

end
