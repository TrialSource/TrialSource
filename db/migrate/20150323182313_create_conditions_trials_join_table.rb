class CreateConditionsTrialsJoinTable < ActiveRecord::Migration
  def change
    create_table :conditions_trials do |t|
      t.integer :condition_id
      t.integer :trial_id

      t.timestamps null: false
    end
    remove_column :conditions, :trial_id
  end
end
