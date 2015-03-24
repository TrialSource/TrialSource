class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :number_of_trials
  has_one :organization
  has_one :login

  def number_of_trials
    object.trials.where(active: true).count
  end

end
