class Exclusion < ActiveRecord::Base
  has_and_belongs_to_many :trial

  def excluded_trials

  end

  def included_trials

  end
end
