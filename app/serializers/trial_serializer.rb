class TrialSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :start_on, :estimated_completed_on,
    :number_of_views, :number_of_appearances, :doctor_id, :organization
    has_many :conditions

    def organization
      id = object.doctor.organization.id
      name = object.doctor.organization.org_name
      [id: id, name: name]
    end
end
