class CreateExclusionsTrialsJoinTable < ActiveRecord::Migration
  def change
    create_table :exclusions_trials do |t|
      t.integer :exclusion_id
      t.integer :trial_id

      t.timestamps null: false
    end
    remove_column :exclusions, :trial_id
  end
end
