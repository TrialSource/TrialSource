class TrialSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :start_on, :estimated_completed_on,
    :number_of_views, :number_of_appearances, :doctor_id
    has_many :conditions
end
