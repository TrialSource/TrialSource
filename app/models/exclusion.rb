class Exclusion < ActiveRecord::Base
  belongs_to :trial

  def excluded_trials

  end

  def included_trials

  end
end
