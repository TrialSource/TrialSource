class Api::V1::NotificationsController < ApplicationController

  def create
    @notification = Notification.new(notification_params)
    @notification.exclusion_ids = params[:exclusion_ids].split(",").map{|e| e.to_i}
    if @notification.save
      NotificationMailer.notification_email(@notification).deliver_now
      render json: @notification
    else
      render json: "Invalid Parameters"
    end
  end

  private

  def notification_params
    params.require(:notification).permit(:email, :condition, :condition_id, :exclusion_ids => [])
  end

end
